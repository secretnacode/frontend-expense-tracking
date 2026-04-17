export type SignUpForm = {
  email: string
  password: string
  rememberMe: boolean
}

export type SignUpFormError = {
  email?: string[]
  password?: string[]
}
