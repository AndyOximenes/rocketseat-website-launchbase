const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const courses = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true,
});

server.get("/", (req, res) => {
    return res.render("courses", { items: courses });
});

server.get("/about", (req, res) => {
    const about = {
        avatar_url:
            "https://rocketseat.gallerycdn.vsassets.io/extensions/rocketseat/rocketseatreactnative/3.0.1/1588456740326/Microsoft.VisualStudio.Services.Icons.Default",
        company: "Rocketseat",
        description:
            "As melhores tecnologias em programação, direto ao ponto e do jeito certo.",
        main_techs: "Principais tecnologias da Rocketseat",
        techs: [
            { name: "React.JS" },
            { name: "React Native" },
            { name: "Node.JS" },
        ],
        links: [
            {
                name: "Site",
                url: "https://rocketseat.com.br/",
            },
            {
                name: "Github",
                url: "https://github.com/Rocketseat",
            },
            {
                name: "LinkedIn",
                url:
                    "https://www.linkedin.com/school/rocketseat/?originalSubdomain=br",
            },
            {
                name: "Facebook",
                url: "https://www.facebook.com/rocketseat/",
            },
        ],
    };

    return res.render("about", { about });
});

server.get("/courses/:id", (req, res) => {
    const { id } = req.params;

    const course = courses.find((course) => {
        return course.id == id;
    });

    if (!course) {
        return res.render("not-found");
    }

    return res.render("course", { item: course });
});

server.use((req, res) => {
    res.status(404).render("not-found");
});

server.listen(5000, () => {
    console.log("🚀 Server is running - port 5000");
});
