using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace BilgehNBSCore.Factories
{
    public class IdCardInformationEndpoint : IdCardInformationEndpointService
    {
        public async Task<IDataResult<IdCardDto>> IdCardByPinOrSeria(string pinOrSeria)
        {
            try
            {
                string sendingValue = string.Empty;



                using (var client = new HttpClient()
                {
                    BaseAddress = new Uri("http://10.11.17.1:8081/api/v1/webservices/idcard/")
                })
                {
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    if (pinOrSeria.Length == 7)
                        sendingValue = "pin?Pin=" + pinOrSeria;
                    else
                        sendingValue = "docnumber?DocumentNumber=" + pinOrSeria;


                    var message = await client.GetAsync(sendingValue).ConfigureAwait(false);
                    string response = await message.Content.ReadAsStringAsync();
                    IdCardDto data = JsonConvert.DeserializeObject<IdCardDto>(response);

                    return new DataResult<IdCardDto>(ResultStatus.Succes, Messages.Add("Uğurlu", true), data);

                }

            }

            catch (Exception ex)
            {

                return null;
            }

        }
        
        public async Task<IdCardNSP> IdCardByNSP(string name, string surname, string patronymic)
        {
            try
            {
                string sendingValue = string.Empty;

                using (var client = new HttpClient()
                {
                    BaseAddress = new Uri("http://10.11.17.1:8081/api/v1/webservices/idcard/")
                })
                {
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                    sendingValue = "asa?Name=" + name + "&Surname=" + surname + "&Patronymic=" + patronymic;


                    var message = await client.GetAsync(sendingValue).ConfigureAwait(false);
                    string response = await message.Content.ReadAsStringAsync();
                    var data = JsonConvert.DeserializeObject<IdCardNSP>(response);

                    return data;
                }

            }


            catch (Exception ex)
            {

                return null;
            }

        }

       

        public async Task<string> GetPinAl(string tokenBase64)
        {
            try
            {
                 

                using (var client = new HttpClient())

                {
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                   //var sendingValue = JsonConvert.SerializeObject(tokenBase64);


                    HttpResponseMessage message = await client.PostAsync("https://10.36.9.100:8084/fin-al/", new StringContent(tokenBase64, Encoding.UTF8, (new MediaTypeWithQualityHeaderValue("application/json")).MediaType)).ConfigureAwait(false);
                    string response = await message.Content.ReadAsStringAsync();
                   // var data =  JsonConvert.DeserializeObject<PinAl>(response);

                    return  response;
                }

            }


            catch (Exception ex)
            {

                return null;
            }
        }
    }
}
