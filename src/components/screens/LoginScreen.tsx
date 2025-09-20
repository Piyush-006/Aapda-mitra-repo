import React, { useState } from 'react';
import { Phone, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { User } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function LoginScreen() {
  const { selectedRole, setUser, setCurrentScreen } = useApp();
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
    if (phone.length !== 10) return;
    
    setLoading(true);
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setOtpSent(true);
    setStep('otp');
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return;
    
    setLoading(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep('profile');
  };

  const handleCompleteProfile = async () => {
    if (!name.trim()) return;
    
    setLoading(true);
    // Simulate profile creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      phone: `+91${phone}`,
      role: selectedRole!,
      verified: true,
    };
    
    setUser(user);
    setLoading(false);
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('phone');
      setOtpSent(false);
    } else if (step === 'profile') {
      setStep('otp');
    } else {
      setCurrentScreen('role-select');
    }
  };

  const LoginLogo = () => (
    <img 
      src="/logo_aapda.jpg" 
      alt="Aapda Mitra Logo" 
      className="w-12 h-12 object-contain mx-auto"
    />
  );
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <Card padding="lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4">
              <LoginLogo />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {step === 'phone' && 'Enter your phone number'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'profile' && 'Complete your profile'}
            </h1>
            <p className="text-gray-600">
              {step === 'phone' && 'We\'ll send you a verification code'}
              {step === 'otp' && `Code sent to +91 ${phone}`}
              {step === 'profile' && 'Tell us about yourself'}
            </p>
          </div>

          {/* Phone Step */}
          {step === 'phone' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <div className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-600">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-20 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
                    maxLength={10}
                  />
                </div>
              </div>
              
              <Button
                onClick={handleSendOTP}
                disabled={phone.length !== 10}
                loading={loading}
                className="w-full"
                size="lg"
              >
                Send OTP
              </Button>
            </div>
          )}

          {/* OTP Step */}
          {step === 'otp' && (
            <div className="space-y-6">
              {otpSent && (
                <div className="flex items-center justify-center p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-700 text-sm">OTP sent successfully!</span>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg text-center tracking-widest"
                    maxLength={6}
                  />
                </div>
              </div>
              
              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                loading={loading}
                className="w-full"
                size="lg"
              >
                Verify OTP
              </Button>
              
              <div className="text-center">
                <button
                  onClick={() => handleSendOTP()}
                  className="text-red-600 hover:text-red-700 text-sm transition-colors"
                >
                  Didn't receive OTP? Resend
                </button>
              </div>
            </div>
          )}

          {/* Profile Step */}
          {step === 'profile' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Role</span>
                  <span className="font-medium text-gray-900 capitalize">{selectedRole}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">Phone</span>
                  <span className="font-medium text-gray-900">+91 {phone}</span>
                </div>
              </div>
              
              <Button
                onClick={handleCompleteProfile}
                disabled={!name.trim()}
                loading={loading}
                className="w-full"
                size="lg"
              >
                Complete Setup
              </Button>
            </div>
          )}
        </Card>

        {/* Security Note */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            Your information is secure and protected. We use advanced encryption to keep your data safe.
          </p>
        </div>
      </div>
    </div>
  );
}