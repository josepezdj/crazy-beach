export const HTMLTemplate = `
    <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- Custom favicon -->
        <link rel="icon" href="./assets/icons/favicon-96x96.png" />
        <!-- Slackey font -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Slackey&display=swap"
            rel="stylesheet"
        />
        <!-- Sunshiney font -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Sunshiney&display=swap"
            rel="stylesheet"
        />
        <!-- Zcool font -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap"
            rel="stylesheet"
        />
        <!-- Bungee, Monoton & Pacifico fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Bungee&family=Monoton&family=Pacifico&display=swap"
            rel="stylesheet"
        />
        <link rel="manifest" href="./manifest.webmanifest" />
        <meta name="theme-color" content="#214653" />
        <!-- IOS support -->
        <link rel="apple-touch-icon" href="./assets/icons/favicon-96x96.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="CrazyBeach" />

        <title>Crazy Beach</title>
    </head>
    <body>
        <div id="app" class="app"></div>
        <!-- Main app script -->
		<script type="module" src="./main.js"></script>
    </body>
</html>
`;