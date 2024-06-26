import { useGetAllAnalyticsMetaQuery } from "../../APIs/analyticsMetaApi"

function AnalticsMetaViewModel() {
        const {data:analytics}=useGetAllAnalyticsMetaQuery()
        
    return {
                analytics
            }
    
}

export default AnalticsMetaViewModel