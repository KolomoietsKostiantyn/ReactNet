import React, { useMemo } from "react";
import { useCallback, useEffect, useState } from "react";

export function AppTest() {
  console.log("App render start");
  const [n, setN] = useState(0);

  // Попробуйте: 1) без useCallback, 2) с useCallback([])
const asd = useCallback( () =>{
 setN(c => c + 1);

},[])

  const onA = useCallback(() => console.log("A clicked"),[]);

  console.log("App render end");

  return (
    <>
   
      <Parent/>
    </>
  );
}

export function Child({ onA }: { onA: () => void }) {
  console.log("Child render");
  useEffect(() => {
    console.log("Child effect subscribe");
    return () => console.log("Child effect cleanup");
  }, [onA]);
  return <button onClick={onA}>Child A</button>;
}

const Child1 = React.memo(function Child({ data, onClick }: { data: { id: number }, onClick: () => void }) {
  console.log("Child render"); // хотим, чтобы это не печаталось без нужды
  return <button onClick={onClick}>id: {data.id}</button>;
});

function Parent() {
  const [n, setN] = useState(0);

  // держим стабильные ссылки:
  const data = () => ({ id: 1 });         // тот же объект
  const onClick = useCallback(() => console.log("ok"), []); // та же функция

  return (
    <>
      <button onClick={() => setN(c => c + 1)}>inc {n}</button>
      <Child1 data={data} onClick={onClick} />
    </>
  );
}