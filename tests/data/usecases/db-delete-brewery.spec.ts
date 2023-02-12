import { DbDeleteBrewery } from '../../../src/data/usecases/db-delete-brewery'
import { mockDeleteBreweryParams } from '../../domain/mocks/mock-brewery'
import { throwError } from '../../domain/mocks/test-helpers'
import { DeleteBreweryRepositorySpy } from '../mocks/mock-db-brewery'

type SutTypes = {
  sut: DbDeleteBrewery
  deleteBreweryRepositorySpy: DeleteBreweryRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteBreweryRepositorySpy = new DeleteBreweryRepositorySpy()
  const sut = new DbDeleteBrewery(deleteBreweryRepositorySpy)
  return { deleteBreweryRepositorySpy, sut }
}

describe('DbDeleteBrewery Usecase', () => {
  it('Should call DeleteBreweryRepository with correct values', async () => {
    const { sut, deleteBreweryRepositorySpy } = makeSut()
    const params = mockDeleteBreweryParams()
    await sut.handle(params)
    expect(deleteBreweryRepositorySpy.params).toBe(params)
  })

  it('Should throw if DeleteBreweryRepository throws', async () => {
    const { sut, deleteBreweryRepositorySpy } = makeSut()
    jest.spyOn(deleteBreweryRepositorySpy, 'handle').mockImplementationOnce(throwError)
    const response = sut.handle(mockDeleteBreweryParams())
    await expect(response).rejects.toThrow()
  })
})
