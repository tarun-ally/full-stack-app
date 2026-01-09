import { useEffect, useState } from 'react';
import './App.css';
import { getHealth } from './api/health.api';
import { createEvent, getEvents, Event } from './api/events.api';

function App() {
  const [health, setHealth] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getHealth().then(setHealth).catch(console.error);
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const handleCreateEvent = async (type: string) => {
    setLoading(true);
    try {
      await createEvent({
        type,
        payload: { userId: '123', message: `Test ${type} event` },
        channels: ['EMAIL', 'SMS']
      });
      await loadEvents();
    } catch (error) {
      console.error('Failed to create event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Event Processing System</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
        <h3>System Status</h3>
        <pre>{JSON.stringify(health, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Create Test Events</h3>
        <button 
          onClick={() => handleCreateEvent('USER_SIGNUP')} 
          disabled={loading}
          style={{ margin: '5px', padding: '10px' }}
        >
          User Signup
        </button>
        <button 
          onClick={() => handleCreateEvent('ORDER_CREATED')} 
          disabled={loading}
          style={{ margin: '5px', padding: '10px' }}
        >
          Order Created
        </button>
        <button 
          onClick={() => handleCreateEvent('PASSWORD_RESET')} 
          disabled={loading}
          style={{ margin: '5px', padding: '10px' }}
        >
          Password Reset
        </button>
        <button 
          onClick={loadEvents}
          style={{ margin: '5px', padding: '10px', background: '#007bff', color: 'white' }}
        >
          Refresh Events
        </button>
      </div>

      <div>
        <h3>Events ({events.length})</h3>
        {events.length === 0 ? (
          <p>No events found. Create some events to see them here.</p>
        ) : (
          <div style={{ display: 'grid', gap: '10px' }}>
            {events.map((event) => (
              <div 
                key={event.id} 
                style={{ 
                  border: '1px solid #ddd', 
                  padding: '10px', 
                  borderRadius: '5px',
                  background: event.status === 'COMPLETED' ? '#d4edda' : 
                           event.status === 'FAILED' ? '#f8d7da' : '#fff3cd'
                }}
              >
                <div><strong>ID:</strong> {event.id}</div>
                <div><strong>Type:</strong> {event.type}</div>
                <div><strong>Status:</strong> {event.status}</div>
                <div><strong>Channels:</strong> {event.channels.join(', ')}</div>
                <div><strong>Created:</strong> {new Date(event.createdAt).toLocaleString()}</div>
                {event.attempts && <div><strong>Attempts:</strong> {event.attempts}</div>}
                {event.error && <div style={{color: 'red'}}><strong>Error:</strong> {event.error}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
