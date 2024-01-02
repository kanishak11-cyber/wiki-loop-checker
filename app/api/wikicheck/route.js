import cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  NextResponse({status:405 ,message: "Method Not Allowed"}).json();

}

export async function POST(req) {
  const body = await req.json();
  const { url } = body;

  try {
    if (!url || !url.match("https://en.wikipedia.org/wiki/")) {
      return NextResponse.json({
        success: 0,
        message: "Please enter a valid Wikipedia URL!",
      });
    }
    const result = await checkLoop(url);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in loop check:", error);
    return NextResponse.json({
      success: 0,
      message: "An error occurred while processing the request.",
    });
  }
}

async function checkLoop(url) {
  const visitedPages = [];
  let currentUrl = url;
  let count = 0;

  while (
    currentUrl.toLowerCase() !== "https://en.wikipedia.org/wiki/philosophy"
  ) {
    if (visitedPages.includes(currentUrl)) {
      return {
        success: 0,
        message: "Loop Detected! A page that is already visited!",
      };
    }

    visitedPages.push(currentUrl);

    const pageData = await fetch(currentUrl);
    const pageContent = await pageData.text();

    currentUrl = getNextLink(pageContent);

    if (!currentUrl) {
      return {
        success: 0,
        message: "No Valid URL found in Loop",
      };
    }

    count++;
  }
  visitedPages.push(currentUrl);
  return {
    count,
    visitedPages,
    success: 1,
    message: "Successfully visited Philosophy Page",
  };
}

function getNextLink(pageContent) {
  const $ = cheerio.load(pageContent);
  const paragraphs = $("#bodyContent p");

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = $(paragraphs[i]);
    const links = paragraph.find('a[href^="/wiki/"]');

    for (let j = 0; j < links.length; j++) {
      const link = $(links[j]);

      if (!link.parents().filter("span").length) {
        const href = link.attr("href");

        if (href) {
          return `https://en.wikipedia.org${href}`;
        }
      }
    }
  }

  return null;
}
