let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NjM1OTI4MywianRpIjoiOWY0ZGRiODYtYmM1OC00ZTZlLTk2YzAtMmEwMGVjOGNiZjkwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlJhbmdlcnMgMTI3IFNxdWFkIiwibmJmIjoxNjk2MzU5MjgzLCJleHAiOjE3Mjc4OTUyODN9.O-i_UdEywloyk4PVKfvTgaxCKoZXzpJ2-tmY2rA_QAQ" 
let userId = localStorage.getItem('token')

export const ApiCalls ={
    getShop: async () => {

        const response = await fetch(`https://roi-cs.onrender.com/api/store`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        });
    
        console.log(response)
    
        if (!response.ok) {
            throw new Error('Failed to fetch data'), response.status
        }
    
        return await response.json()
    }
}

