import {createClient} from "@sanity/client";
import ImageUrlBuilder  from "@sanity/image-url";

// quoxusny
// lya597gf
const client = createClient({
    projectId: "lya597gf",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21"
})

const builder = ImageUrlBuilder(client)
export const urlFor = (source)=> builder.image(source)

export default client;