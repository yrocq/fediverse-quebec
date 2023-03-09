import Post from "./types/post";
import fs from "fs";
import { join } from "path";
import { serialize } from "next-mdx-remote/serialize";

type PostInformation = {
  path: string;
  slug: string;
};

const postsDirectory = join(process.cwd(), "_posts");

export async function getAllPosts() {
  const information = getPostsInformation();
  const postsPromises = information.map(
    async (PostInformation) => await getPostBySlug(PostInformation.slug)
  );
  const posts = await Promise.all(postsPromises);
  posts.sort((post1: Post, post2: Post) =>
    post1.created > post2.created ? -1 : 1
  );

  return posts;
}
export function getPostsInformation() {
  const files = fs.readdirSync(postsDirectory, { withFileTypes: true });

  return files
    .map((file) => {
      let path = "";
      let slug = "";
      const splitted = file.name.split(".");
      const extension = splitted.pop();

      if (file.isDirectory()) {
        path = join(file.name, "index.md");
        slug = file.name;

        if (!fs.existsSync(join("_posts", path))) {
          throw new Error("Can't find index.md");
        }
      } else {
        path = file.name;
        if (extension == "md") {
          slug = splitted.join(".");
        }
      }
      return {
        path,
        slug,
      };
    })
    .filter((markdownFile) => markdownFile.slug != "");
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const postPath = join(postsDirectory, slug);
  let filePath: string;

  if (fs.existsSync(postPath)) {
    filePath = join(postsDirectory, slug, "index.md");
  } else {
    filePath = join(postsDirectory, slug + ".md");
  }

  const fileContents = loadPost(filePath);

  const content = await serialize(fileContents, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    parseFrontmatter: true,
  });

  const frontmatter = content.frontmatter as Record<string, any>;

  if (!frontmatter) {
    throw new Error("Missing frontmatter");
  }
  if (!frontmatter.title) {
    throw new Error("Missing title");
  }

  if (!frontmatter.date) {
    throw new Error("Missing date");
  }

  const items: Post = {
    title: frontmatter.title,
    slug: slug,
    created: frontmatter.date + "T00:00-04:00",
    absoluteUrl: getAbsoluteUrlForSlug(slug),
    content,
  };

  return items;
}

export function loadPost(path: string) {
  const realSlug = path.replace(/\.md$/, "");
  return fs.readFileSync(path, "utf8");
}

export const getAbsoluteUrlForSlug = (slug: string) =>
  getAbsoluteUrlForPath("billets/" + slug);

export const getAbsoluteUrlForPath = (path: string) =>
  process.env.ROOT + "/" + path;
