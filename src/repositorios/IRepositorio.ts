interface IRepositorio<T> {
  queryObj?: any
  execute(): Promise<T>
}

export { IRepositorio }
