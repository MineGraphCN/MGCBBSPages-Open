// generateSidebar.js
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { resolve, extname, basename } from "node:path";
const DOCS_DIR = resolve(process.cwd(), ".");
const OUTPUT_FILE = resolve(DOCS_DIR, ".vitepress/sidebar.json");

// 递归生成侧边栏

function getSidebar(dir, basePath = "/") {
    const fullPath = resolve(DOCS_DIR, dir); // 计算完整路径
    const files = readdirSync(fullPath); // 读取文件夹内容
    const sidebar = [];

    files.forEach((file) => {
        const filePath = resolve(fullPath, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
            // 子目录处理
            const subItems = getSidebar(
                `${dir}/${file}`,
                `${basePath}${file}/`
            );
            let indexLink = ""; // 用于存储index项的路径

            // 检查subItems中是否有index项，并处理
            if (subItems && subItems.length > 0) {
                const indexItemIndex = subItems.findIndex(
                    (item) => item.text === "Index"
                );
                if (indexItemIndex !== -1) {
                    indexLink = subItems[indexItemIndex].link;
                    subItems.splice(indexItemIndex, 1); // 移除index项
                }
            }

            if (
                !file.startsWith(".") &&
                !file.includes("node") &&
                subItems &&
                subItems.length > 0
            ) {
                let dir = {
                    text: capitalize(file),
                    collapsible: true,
                    items: subItems,
                };
                // 检查是否存在indexLink，如果存在则添加到dir对象中
                if (indexLink) {
                    dir.link = indexLink;
                }
                sidebar.push(dir);
            }
        } else if (stat.isFile() && extname(file) === ".md") {
            // Markdown 文件处理
            const name = basename(file, ".md");
            sidebar.push({
                text: capitalize(name),
                link: `${basePath}${name === "index" ? "" : name}`,
            });
        }
    });

    return sidebar;
}

// 工具函数：首字母大写
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// 主函数
function generateSidebar() {
    const sidebar = getSidebar(".");

    if (sidebar && sidebar.length > 0) {
        const indexItemIndex = sidebar.findIndex(
            (item) => item.text === "Index"
        );
        if (indexItemIndex !== -1) {
            sidebar.splice(indexItemIndex, 1); // 移除index项
        }
    }
    writeFileSync(OUTPUT_FILE, JSON.stringify(sidebar, null, 2));
    console.log(`Sidebar generated at: ${OUTPUT_FILE}`);
}

generateSidebar();
