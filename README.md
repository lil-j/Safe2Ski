![banner](https://github.com/lil-j/Safe2Ski/blob/master/public/banner.png?raw=true)
# Introducing Safe2Ski
A data-driven approach to mastering your ski-trip commute. [Check It Out!](https://safe2ski.lilj.dev)
## The Inspiration
For me, going through my local ski pass has always been a struggle. With a variety of factors always impacting the decision to go, it's hard to focus on all of them at once and sitll make a responsible decision. Safe2Ski aims to solve all of these problems by taking the data and compiling it into a single score. From a set of perfect conditions determined by an analysis of decades of pass closure data- each factor (such as heavy snow, etc) has a different weight in determining the end score.
## The Stack
Built with Next.js & Deployed with Vercel
## Why Next.js
This project requires a multitude of calls to many different APIs. To simplify client-side downloads and optimize speed, this website takes advantage of **Static Generation**. Every request is made on the server-side at build time and is also set to **revalidate every 30 seconds** to keep the information up-to-date.
