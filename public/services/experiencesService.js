import axios from 'axios'
import { config } from '../configs/postgresql'

const experiencesService = {
     getAllExperiences: () => {
          const result = axios.get(config.apiUrl + 'experiences').then((response) => {
               return {
                    success: response.data.success,
                    data: response.data.data
               }
          }).catch((error) => {
               return {
                    success: false,
                    data: error
               }
          })
          return result
     },
     createExperience: (data) => {
          const result = axios.post(config.apiUrl + 'create/experience', data).then((response) => {
               return {
                    success: response.data.success,
                    data: response.data.data
               }
          }).catch((error) => {
               return {
                    success: false,
                    data: error
               }
          })
          return result
     }
}

export default experiencesService