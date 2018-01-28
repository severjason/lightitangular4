export interface IAppProduct {
  id: number,
  img: string,
  text: string,
  title: string,
}

export interface IAppReview {
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

export interface IAppError {
  status: boolean,
  message: string,
}
