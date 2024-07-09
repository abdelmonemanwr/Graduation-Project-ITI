using Microsoft.EntityFrameworkCore;
using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly ShippingContext db;

        /// <summary>
        /// shipping parameterized constructor
        /// </summary>
        /// <param name="_db"></param>
        public GenericRepository(ShippingContext _db)
        {
            db = _db;
        }

        /// <summary>
        /// Add Object to Database
        /// </summary>
        /// <param name="obj"></param>
        public async Task Add(T obj)
        {
            await db.Set<T>().AddAsync(obj);
        }
        /// <summary>
        /// Delete By Id
        /// </summary>
        /// <param name="id"></param>
        public async Task Delete(int id)
        {
            var obj = await db.Set<T>().FindAsync(id);

            db.Set<T>().Remove(obj);
        }

        /// <summary>
        /// Delete Object
        /// </summary>
        /// <param name="obj"></param>
        public async Task Delete(T obj)
        {
            db.Set<T>().Remove(obj);
        }

        /// <summary>
        /// Get All Data
        /// </summary>
        /// <returns>Dbset<T></returns>
        public async Task<List<T>> GetAll()
        {
            return await db.Set<T>().ToListAsync();
        }

        /// <summary>
        /// Get Object By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Object</returns>
        public async Task<T> GetById(int id)
        {
            return await db.Set<T>().FindAsync(id);
        }

        /// <summary>
        /// Edit Object Data
        /// </summary>
        /// <param name="obj"></param>
        public async Task Update(T obj)
        {
            db.Set<T>().Update(obj);
        }

        /// <summary>
        /// Save Changes to Database
        /// </summary>
        /// <returns>Number of Affected Rows</returns>
        public async Task<int> Save()
        {
            return await db.SaveChangesAsync();
        }

        public async Task<T> GetById(string id)
        {
            return await db.Set<T>().FindAsync(id);
        }

        public async Task Delete(string id)
        { 
            var obj = await db.Set<T>().FindAsync(id);

            db.Set<T>().Remove(obj);
        }
    }
}
