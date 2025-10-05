// src/lib/queries.ts
export const allServicesQuery = `*[_type == "service"]{
  _id,
  name,
  platform,
  description,
  pakete[]{
    name,
    tiers[]{
      quantity,
      normalPrice,
      salePrice
    }
  }
}`;

export const pricingPlansQuery = `*[_type == "pricingPlan"]|order(order asc){
  _id,
  name,
  description,
  price,
  originalPrice,
  popular,
  order,
  features
}`;

export const platformsQuery = `*[_type == "platform"]|order(title asc){
  _id,
  title,
  "slug": slug.current
}`;

export const platformCategoriesBySlug = `{
  "platform": *[_type == "platform" && slug.current == $slug][0]{ _id, title, "slug": slug.current },
  "categories": *[_type == "platformCategory" && references(^.platform._id)]|order(order asc, label asc){
    _id, value, label, packages[]{ value, label, price }, order
  }
}`;

export const servicesByPlatform = `*[_type == "service" && platform->slug.current == $slug]{
  _id,
  name,
  description,
  pakete[]->{
    name,
    tiers[]{
      amount,
      salePrice,
      normalPrice,
      delivery,
      popular
    }
  }
}`;
