using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Factories
{
    public class IdCardNSP
    {
        [JsonProperty("Data")]
        public DataForNSP DataForNSP { get; set; }
    }
}
