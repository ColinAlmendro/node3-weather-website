const path = require("path"); //core module no install required
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Colin Almendro",
	});
});

///////////////////////////////////
app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		name: "Colin Almendro",
	});
});

///////////////////////////////////
app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Page",
		message: "Enter a location name and hit the search button.",
		name: "Colin Almendro",
	});
});

/////////////////////////////////
app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({ error: "You must provide an address" });
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return console.log(`Geocode error : ${error}`);
			}

			forecast(
				latitude,
				longitude,
				(error, { currTemp, feelsLikeTemp, weather_description } = {}) => {
					if (error) {
						return console.log(`Forecast error : ${error}`);
					}
					let msg = "";
					if (currTemp !== feelsLikeTemp) {
						msg = `${weather_description}. \n It is currently ${currTemp} degrees outside but feels like ${feelsLikeTemp} degrees.`;
					} else {
						msg = `${weather_description}. \n It is currently ${currTemp} degrees outside.`;
					}
					res.send({
						location,
						latitude,
						longitude,
						currTemp,
						feelsLikeTemp,
						forecast: msg,
					});
				}
			);
		}
	);
});

///////////////////////////////////
app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		message: "Help article not found",
		name: "Colin Almendro",
	});
});

///////////////////////////////////
app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		message: "Page not found",
		name: "Colin Almendro",
	});
});

///////////////////////////////////

app.listen(port, () => {
	console.log("Server running on port " + port);
});
