import { defineConfig } from "vitepress";
import sidebar from "./sidebar.json";
// https://vitepress.dev/reference/site-config
export default async () => {
    return defineConfig({
        head: [["link", { rel: "icon", href: "/favicon.ico" }]],
        lastUpdated: true,
        title: "MGC Open Platform",

        description:
            "Docs of MGC Platform, MGC BBS and MGC Pages ci/cd support.",
        themeConfig: {
            // https://vitepress.dev/reference/default-theme-config
            nav: [
                { text: "Home", link: "/" },
                { text: "Examples", link: "/markdown-examples" },
            ],
            lastUpdated: {
                text: "Updated at",
                formatOptions: {
                    dateStyle: "full",
                    timeStyle: "medium",
                },
            },
            sidebar: sidebar,
            search: {
                provider: "local",
            },
            socialLinks: [
                { icon: "github", link: "https://github.com/vuejs/vitepress" },
            ],
            footer: {
                message: "Released under the MIT License.",
                copyright: "Copyright © 2019-present Evan You",
            },
        },
    });
};
