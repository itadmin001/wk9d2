let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NjM1OTI4MywianRpIjoiOWY0ZGRiODYtYmM1OC00ZTZlLTk2YzAtMmEwMGVjOGNiZjkwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlJhbmdlcnMgMTI3IFNxdWFkIiwibmJmIjoxNjk2MzU5MjgzLCJleHAiOjE3Mjc4OTUyODN9.O-i_UdEywloyk4PVKfvTgaxCKoZXzpJ2-tmY2rA_QAQ" 
let userId = localStorage.getItem('token')

export const ApiCalls ={
    getShop: async () =>{

        const response = await fetch(`https://roi-cs.onrender.com/api/store`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        });
    
        if (!response.ok) {
            throw new Error('Fetch Data Failed'), response.status
        }
    
        return await response.json()
    },

    getOrder: async () => {

        const response = await fetch(`https://roi-cs.onrender.com/api/order/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Fetch Data Failed'), response.status
        }
        return await response.json()
    },

    createOrder: async (data: any) =>{

        const response = await fetch(`https://roi-cs.onrender.com/api/order/create/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Fetch Data Failed'), response.status
        }

        return await response.json()
    },

    updateOrder: async (id: string, data: any) =>{

        const response = await fetch(`https://roi-cs.onrender.com/api/order/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok){
            throw new Error('Fetch Data Failed'), response.status
        }

        return await response.json()
    },

    deleteOrder: async (id: string, data: any) => {

        const response = await fetch(`https://roi-cs.onrender.com/api/order/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Fetch Data Failed'), response.status  //error message & status code
        }

        return await response.json()
    }
}

