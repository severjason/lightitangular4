export interface IProduct {
  id: number,
  img: string,
  text: string,
  title: string,
}

export interface IReview {
  id: number,
  product: number,
  created_at: Date,
  created_by: {
    id: number,
    username: string,
  },
  rate: number,
  text: string,
}
