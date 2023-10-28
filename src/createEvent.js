import React from 'react';

function CreateEventButton() {
  // You can add any event creation logic here
  const handleCreateEvent = () => {
    // Prompt the user for the event name
    const eventName = window.prompt('Enter the name of the event:');
    
    // Prompt the user for the event date and time
    const eventDateTime = window.prompt('Enter the date and time of the event (e.g., "YYYY-MM-DD HH:MM"):');
    
    if (eventName && eventDateTime) {
      // You can add code here to create a new event with the provided details
      alert(`New event created!\nEvent Name: ${eventName}\nEvent Date and Time: ${eventDateTime}`);
    } else {
      alert('Event creation canceled or missing information.');
    }
  };

  return (
    <button onClick={handleCreateEvent}>
      Create New Event
    </button>
  );
}

export default CreateEventButton;
