import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 px-4 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Documentation</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Learn</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Blog</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Guides</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">About</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Careers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Pricing</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Brand</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Portfolio</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Templates</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Plugins</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Marketplace</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Forum</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Discord</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Events</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Meetups</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Twitter</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Privacy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Terms</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Cookies</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Licenses</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Settings</Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-white/10 my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-semibold">P</span>
            </div>
            <span className="font-semibold text-lg">Portfolio</span>
          </div>
          
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Portfolio Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
