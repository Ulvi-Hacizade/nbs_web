using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Factories
{
    public static class Messages
    {
        public static string Add(string Name, bool isPlural)
        {
            if (isPlural) return $"{Name} Uğurla əlavə edildi!";
            else return $"{Name} Əlavə olunarkən xəta baş verdi!";
        }

        public static string Update(string Name, bool isPlural)
        {
            if (isPlural) return $"{Name} Uğurla redaktə edildi!";
            else return $"{Name} Redaktə ediləkən xəta baş verdi!";
        }

        public static string GetAll(string Name, bool isPlural)
        {
            if (isPlural) return $"{Name} Tapıldı";
            else return $"{Name} Tapılmadı";
        }

        public static string Get(string Name, bool isPlural)
        {
            if (isPlural) return $"{Name} Tapıldı";
            else return $"{Name} Tapılmadı";
        }
    }
}
