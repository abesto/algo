({
	appDir: "./",
    baseUrl: ".",
    dir: "./",
	optimize: "none",
    modules: [
	        {
	            name: "main-built",
				include: ["main", "app/common/i18n/Updaters/SimpleUpdater", "app/common/i18n/Updaters/JqueryEventUpdater", "app/common/i18n/DataProviders/AsyncJsonDataProvider"]
	        }
    ]
})
