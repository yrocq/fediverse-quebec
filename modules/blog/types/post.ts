import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'


export default interface Post {
    title: string
    created: string
    slug: string
    content: MDXRemoteSerializeResult
    coverImage?: CoverImage,
    absoluteUrl: string
}

type CoverImage = {
    src: string,
    width: number,
    height: number,
}