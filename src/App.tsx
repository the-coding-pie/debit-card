import React, { useState } from "react";
import Form from "./components/Form";
import Card from "./components/Card/Card";

const App = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="background w-screen h-screen bg-blue-50 overflow-x-hidden overflow-y-auto flex items-center justify-center pt-28 font-sans">
      <div className="wrapper relative">
        <Form>
          <Card />
        </Form>
      </div>
    </div>
  );
};

export default App;
