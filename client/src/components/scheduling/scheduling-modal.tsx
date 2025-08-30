import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Mail, MessageSquare, Video } from "lucide-react";

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SchedulingModal({ isOpen, onClose }: SchedulingModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Gerar dias do mês atual e próximo
  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const today = currentDate.getDate();
    
    const days = [];
    
    // Dias em branco para começar no dia correto da semana
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const isPast = day < today;
      const isToday = day === today;
      days.push({ day, isPast, isToday });
    }
    
    return days;
  };

  // Horários disponíveis
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
  ];

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Criar evento do Google Calendar
    const eventDate = new Date(currentYear, currentMonth, parseInt(selectedDate));
    const [hours, minutes] = selectedTime.split(':');
    eventDate.setHours(parseInt(hours), parseInt(minutes));
    
    const endDate = new Date(eventDate);
    endDate.setMinutes(endDate.getMinutes() + 30); // 30 minutos de duração

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Conversa sobre projeto - ' + formData.name)}&dates=${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(`Nome: ${formData.name}\nEmail: ${formData.email}\nMensagem: ${formData.message}`)}&add=phaison.vieira@gmail.com`;

    window.open(googleCalendarUrl, '_blank');
    onClose();
  };

  const calendarDays = generateCalendarDays();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            Phaison Vieira
          </DialogTitle>
          <div className="mt-2">
            <h3 className="text-xl font-medium">Discovery call (30 min)</h3>
            <p className="text-gray-400 mt-1">Vamos conversar sobre seu projeto!</p>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Calendário */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {monthNames[currentMonth]} {currentYear}
              </h4>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-400 mb-2">
              {weekDays.map(day => (
                <div key={day} className="p-2 font-medium">{day}</div>
              ))}
            </div>

            {/* Dias do mês */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((dayData, index) => (
                <button
                  key={index}
                  onClick={() => dayData && !dayData.isPast && setSelectedDate(dayData.day.toString())}
                  disabled={!dayData || dayData.isPast}
                  className={`
                    h-10 w-10 text-sm rounded-lg transition-all duration-200
                    ${!dayData ? 'invisible' : ''}
                    ${dayData?.isPast ? 'text-gray-600 cursor-not-allowed' : 'hover:bg-white/10'}
                    ${dayData?.isToday ? 'bg-primary/20 text-primary' : ''}
                    ${selectedDate === dayData?.day.toString() ? 'bg-primary text-white' : 'text-white/70'}
                  `}
                >
                  {dayData?.day}
                </button>
              ))}
            </div>
          </div>

          {/* Horários e Formulário */}
          <div className="space-y-6">
            {/* Horários */}
            {selectedDate && (
              <div className="space-y-3">
                <h4 className="text-lg font-medium flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Horários disponíveis
                </h4>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        p-2 text-sm rounded-lg border transition-all duration-200
                        ${selectedTime === time 
                          ? 'bg-primary text-white border-primary' 
                          : 'border-white/20 hover:border-primary/50 hover:bg-white/5'
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Formulário */}
            {selectedDate && selectedTime && (
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Seus dados</h4>
                
                <div className="space-y-3">
                  <div>
                    <Input
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="email"
                      placeholder="Seu e-mail"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      placeholder="Conte um pouco sobre seu projeto..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-20"
                    />
                  </div>
                </div>

                {/* Detalhes da reunião */}
                <div className="bg-white/5 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>30 minutos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Video className="h-4 w-4 text-primary" />
                    <span>Google Meet</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>phaison.vieira@gmail.com</span>
                  </div>
                </div>

                <Button 
                  onClick={handleSchedule}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Agendar reunião
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}