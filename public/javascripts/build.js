({
	appDir: "./",
    baseUrl: ".",
    dir: "./",
	optimize: "none",
	paths: {
		'vendor/jquery': 'vendor/jquery.min',
		'vendor/underscore': 'vendor/underscore.min'
	},
    modules: [
	        {
	            name: "main",
				include: ["main", "app/common/i18n/Updaters/SimpleUpdater", "app/common/i18n/Updaters/JqueryEventUpdater", "app/common/i18n/DataProviders/AsyncJsonDataProvider"]
	        }
    ]
})
