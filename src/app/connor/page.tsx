import React from 'react';
import Test from './test';

const App = () => {
    return (
        <div className="flex flex-col">
            <h1 className="text-4xl bg-main flex justify-end fade-in">Connor's Page</h1>
            <h1 className="text-4xl bg-main flex fade-in">Connor's Page</h1>
            <h1 className="text-4xl bg-main flex fade-in">Connor's Page</h1>
            <Test />
        </div>
    );
}

export default App;