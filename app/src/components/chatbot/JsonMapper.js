import Messages from './mesages.json';
export default async () => {
    
        const result = await fetch(`http://localhost:4000/api/ddds`);
        if(result.status === 404)
            return false
        const DDDs =  await result.json();
        
        const AllDDDs = DDDs.map((ddd => {
            return {
                content: ddd.ddd,
                id: ddd.ddd_id
            }
        }));
        Messages.data.b.options = [...AllDDDs];
        Messages.data.c.options = [...AllDDDs];
        return Messages

}