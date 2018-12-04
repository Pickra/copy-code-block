const chromeDriver = require("chromedriver");
const seleniumServer = require("selenium-server");

const config = {
    src_folders: "./src/tests",
    output_folder: "./reports",
    custom_commands_path: "",
    test_workers: false,
    globals_path: "./nightwatch-global.js",

    selenium: {
      start_process: true,
      server_path: seleniumServer.path,
      log_path: "",
      host: "127.0.0.1",
      port: 4444,
      cli_args: { "webdriver.chrome.driver": chromeDriver.path }
    }, 

    test_settings: {
      default: {
        launch_url: "http://localhost:8080/?selectedKind=",
        skip_testcases_on_fail: false,
        end_session_on_fail: false,
        screenshots: { enabled: false },

        desiredCapabilities: { 
          browserName: "chrome",
          javascriptEnabled: true,
          chromeOptions: {
            // TODO: make clipboard + headless chrome play nice
            // args: ["--headless"],
            prefs: { 
              profile: {
                default_content_setting_values: {
                  clipboard: 1
                }
              }
            }
          }
        }
      }
    }
}

module.exports = config;