import Messages from './mesages.json';
export default async () => {
    
        const result = await fetch(`http://localhost:4000/api/ddds`);
        if(result.status === 404)
            return false
        const DDDs =  await result.json();
        Messages.data.b.options = [...DDDs];
        return Messages.data

}