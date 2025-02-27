import { useState } from 'react';
import { useTheme } from './ThemeContext';
import { useAuth } from './hooks/useAuth';
import { Header } from './components/Header';
import { MedicationList } from './components/MedicationList';
import { Navigation } from './components/Navigation';
import { AddMedicationForm } from './components/AddMedicationForm';
import { AuthForm } from './components/AuthForm';
import { MedicationsList } from './components/MedicationsList';
import { useMedications } from './hooks/useMedications';
import { useCalendar } from './hooks/useCalendar';

function App() {
  const { isDark } = useTheme();
  const { user, loading } = useAuth();
  const [showNewMedForm, setShowNewMedForm] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'medications'>('home');
  const { medications, handleMedicationAction, addReminder } = useMedications();
  const calendar = useCalendar();

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-150 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`min-h-screen transition-colors duration-150 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <AuthForm />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-150 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {currentView === 'home' ? (
        <>
          <Header
            onAddMedication={() => setShowNewMedForm(true)}
            calendar={calendar}
            user={user}
          />

          <MedicationList
            medications={medications}
            selectedDate={calendar.selectedDate.toISOString().split('T')[0]}
            slideDirection={calendar.slideDirection}
            onMedicationAction={handleMedicationAction}
          />
        </>
      ) : (
        <MedicationsList />
      )}

      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {showNewMedForm && (
        <AddMedicationForm
          onClose={() => setShowNewMedForm(false)}
          onAdd={addReminder}
          selectedDate={calendar.selectedDate.toISOString().split('T')[0]}
        />
      )}
    </div>
  );
}

export default App;