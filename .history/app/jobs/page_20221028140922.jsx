async function getData() {
    const res = await fetch('http://localhost:1337/api/jobs?populate=*');
    console.log(res);
    return res.json();
}

export default function JobPage() {
  const a
    return <p>Hello</p>
}