interface IRepositorioEstados<T> {
  queryObj?: any
  execute(): Promise<T>
}

export { IRepositorioEstados }
