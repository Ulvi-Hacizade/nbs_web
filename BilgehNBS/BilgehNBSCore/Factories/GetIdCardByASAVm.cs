using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Factories
{
    public class GetIdCardByASAVm
    {
        [JsonProperty("Document")]
        public Document2 Document { get; set; }
        public Person Person { get; set; }
    }
}
