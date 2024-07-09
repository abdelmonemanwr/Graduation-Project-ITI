namespace ShippingSystem.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        public Task<List<T>> GetAll();

        public Task<T> GetById(int id);

        public Task<T> GetById(string id);

        public Task Add(T obj);
               
        public Task Update(T obj);

        public Task Delete(int id);

        public Task Delete(string id);

        public Task Delete(T obj);

        public Task<int> Save();

    }
}
