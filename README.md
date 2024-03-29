# tigum-gui

Frontend for Tigum centralized learning tool, built with React/Typescript

# Motivation

Tigum aims to be an enviroment for people to base their education online.

The problem with basing your education online is that it is difficult to gain an in depth understanding of specific topics by just reading web pages and watching videos. Tigum aims to improve the experience of personalized online education, by centralizing parts of resources you find most useful in one place, and helping you refine your knowledge on topics over time.

Over the last few years I've been learning how to write software. About 95% of the resources I have used have been videos, blog posts and offical documentation. The internet has given me the access to a world of knowledge which has allowed me to enter into a career in software.

This tool will allow me to centralize online resources that I find the most useful in helping learn about different topics. I will also be able to take my own notes on those resources so that I can describe concepts in my own words/code.

Access to this tool will be completely private but if I wish to share that content I can make it public with my own branded site own branded site (e.g bsmithdev.tigum.io). If I want to use the content elsewhere I can export my notes/resources to a html/md/pdf doc.

# V1 flow

## Researching phase

While going through web articles or videos about a ceratin topic e.g "A history of HTTP", you will be able to grab content that is useful to you from websites (intially content will be text, images or youtube videos). First select content by draging mouse over. Second click on tigum extension. Third save under topic ("A history of HTTP") or create new one, you will then be asked if you want to switch on auto save for ("A history of HTTP") for this session. If you select yes then every time you select content and press tigum-extension that content will be saved under "A history of HTTP" in your tigum account.

## Refining phase

You can go to a topic you've collected some resources on in the tigum-gui. From here you can take you own notes along side those resources e.g "A history of HTTP" you could write the high level specs for GET POST DELETE in your own words etc and have youtube video embedded from a section of youtube video that describes this well. Combining your own thoughts and knowledge on a subject along with other peoples resources is a great way to learn concepts quickly. Its important to note that you may not even have external resources under a topic. Tigum puts no rescritions on what goes in a topic.

## Sharing phase

If you feel like notes/collection of resources on a particular topic could help other people, you can publish that with your own branded site (e.g bsmithdev.tigum.io).

# Setup Guide
### Pull down frontend repo
```
git clone https://github.com/bbsmithy/tigum-gui.git`
```

### Install node on your machine
https://nodejs.org/en/download/

### Install project dependencies
```
cd ./tigum-gui
npm install
```

### Pull down API repo
```
cd ..
git clone https://github.com/bbsmithy/tigum-api.git
```

### Install cargo (Rust compiler and package manger)
https://doc.rust-lang.org/cargo/getting-started/installation.html

### Install API dependencies
This will download crates and run the application
```
cd ./tigum-api
cargo run
```

### Start frontend app
```
cd ..
cd ./tigum-gui
npm run start
```
Navigate to http://localhost:3000
And you should see the login page.
