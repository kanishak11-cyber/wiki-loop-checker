# Wikipedia Loop Checker

This project is a Wikipedia Loop Checker that allows users to input a Wikipedia URL and check how many requests are required to reach the "Philosophy" page by navigating through the first link in the main body text of each Wikipedia page.

## Features

- Input a Wikipedia URL and check the loop.
- Record each visited page and count the number of requests made until reaching the "Philosophy" page.
- Display the number of requests and a list of visited Wikipedia pages.

## Tech Stack

- **Frontend**: React
- **HTTP Client**: Axios
- **Web Scraping**: Cheerio
- **Loading Spinner**: React-Loader-Spinner

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. **Install Dependencies:**

    ```bash
    # Install client dependencies
    cd your-repo
    npm install
    ```

3. **Run the Application:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.


## FRONTEND



### File Structure

```
├── app
│   ├── api
│   │   ├── wikicheck
│   │   │   ├── route.js
│   │   ├── favicon.ico
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── global.css
│   ├── public
│   ├── .gitignore
│   ├── jsconfig.json
│   ├── next.config.js
│   ├── package.json
│   ├── README.md
│   ├── package-lock.json
│   ├── tailwind.config.js

```

## Usage

1. Enter a valid Wikipedia URL in the input field.
2. Click the "Check Loop" button to initiate the loop check.
3. View the results, including the total number of requests and a list of visited pages.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
