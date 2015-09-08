using System;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Infrastructure
{
    public static class StringExtensions
    {
        public static Dictionary<string, string> ToDictionary(this string keyValue)
        {
            return keyValue.Split(new[] { ';' }, StringSplitOptions.RemoveEmptyEntries)
                          .Select(part => part.Split('='))
                          .ToDictionary(split => split[0], split => split[1]);
        }
    }
}