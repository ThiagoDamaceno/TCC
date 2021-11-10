abstract class AbstractTeste {
  protected async getFunctionPerformanceInMilliseconds (asyncFunctionToTest: Function): Promise<number> {
    const initialTime = Date.now()
    await asyncFunctionToTest()
    const endTime = Date.now()
    return endTime - initialTime
  }
}

export { AbstractTeste }
