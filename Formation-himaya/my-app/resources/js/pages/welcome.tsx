import React from "react";
import { Star, Shield, CreditCard, Bell, CheckCircle, ArrowRight } from "lucide-react";

/**
 * Airtasker-like landing page
 * - Single-file React component
 * - TailwindCSS utility classes only
 * - Responsive & accessible
 * - No external images required (uses gradients/SVGs/placeholders)
 */

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-2 text-white/90">
    <span className="text-lg">{value}</span>
    <span className="text-white/60 text-sm">{label}</span>
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-white text-slate-900 shadow-sm">
    {children}
  </span>
);

const CTAButton = ({ children }: { children: React.ReactNode }) => (
  <button className="group inline-flex items-center gap-2 rounded-full px-5 py-3 bg-[#2F6DF6] text-white font-medium shadow-md hover:shadow-lg hover:translate-y-[-1px] transition">
    {children}
    <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
  </button>
);

const GhostButton = ({ children }: { children: React.ReactNode }) => (
  <button className="inline-flex items-center gap-2 rounded-full px-5 py-3 bg-white text-slate-900 font-medium shadow-md hover:shadow-lg">
    {children}
  </button>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 p-6 ${className}`}>{children}</div>
);

function TrustpilotStars() {
  return (
    <div className="flex items-center gap-2 text-white/90">
      <span className="font-medium">Trustpilot</span>
      <div className="flex gap-1" aria-label="4.5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`size-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-white/40"}`} />
        ))}
      </div>
      <span className="text-white/70">4.1 ‘Great’ (12,111 reviews)</span>
    </div>
  );
}

const Category = ({ title, caption }: { title: string; caption: string }) => (
  <Card className="flex items-start gap-4 hover:shadow-md transition">
    <div className="size-10 rounded-lg bg-blue-50" />
    <div>
      <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
      <p className="text-slate-600 text-sm">{caption}</p>
    </div>
  </Card>
);

const TaskCard = ({ title, price, tag }: { title: string; price: string; tag: string }) => (
  <Card className="hover:shadow-md transition">
    <div className="text-xs text-blue-700 font-semibold mb-2">{tag}</div>
    <h4 className="font-semibold text-slate-900 mb-6">{title}</h4>
    <div className="mt-auto text-right font-semibold">{price}</div>
  </Card>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-medium">
    {children}
  </span>
);

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-200/60">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-extrabold text-[#2F6DF6]">Airtasker*</div>
            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
              <a href="#" className="hover:text-slate-900">Post a task</a>
              <a href="#" className="hover:text-slate-900">Categories</a>
              <a href="#" className="hover:text-slate-900">Browse tasks</a>
              <a href="#" className="hover:text-slate-900">How it works</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-slate-700 hover:text-slate-900 text-sm">Sign up</button>
            <button className="text-slate-700 hover:text-slate-900 text-sm">Log in</button>
            <button className="hidden sm:inline-flex rounded-full bg-slate-900 text-white text-sm px-4 py-2">Become a Tasker</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0D1A4B]">
        <div aria-hidden className="absolute inset-0">
          <svg className="absolute -left-16 top-10 opacity-20" width="200" height="400">
            <rect x="40" y="0" width="30" height="400" fill="#6EA8FF" />
          </svg>
          <svg className="absolute right-10 top-16 opacity-80" width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="70" fill="#1F3AA5" />
            <rect x="55" y="40" width="20" height="60" rx="10" fill="#F7EFFF" />
          </svg>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <h1 className="[word-spacing:-10px] leading-[0.9] font-extrabold text-[40px] sm:text-6xl md:text-7xl lg:text-8xl tracking-tight">GET ANYTHING<br />DONE</h1>
              <p className="mt-6 text-white/80 max-w-xl">Post any task. Pick the best person. Get it done.</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CTAButton>Post your task for free</CTAButton>
                <GhostButton>Earn money as a Tasker</GhostButton>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Stat value="1M+" label="customers" />
                <Stat value="2.5M+" label="tasks done" />
                <Stat value="4M+" label="user reviews" />
              </div>
              <div className="mt-6"><TrustpilotStars /></div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-blue-300 to-indigo-400/70 shadow-2xl" />
              <div className="absolute -bottom-8 left-8 right-8 rounded-2xl bg-[#2F6DF6] text-white p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-white/20" />
                  <div className="flex-1">
                    <div className="font-semibold">VISA / Team behind the dream</div>
                    <p className="text-white/80 text-sm">Official partner banner area</p>
                  </div>
                  <GhostButton>Learn more</GhostButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick steps + categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Post your first task in seconds</h2>
            <p className="text-slate-600 mb-8 max-w-prose">Save yourself hours and get your to‑do list completed.</p>
            <ul className="space-y-4">
              {[
                "Describe what you need done",
                "Set your budget",
                "Receive quotes and pick the best Tasker",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">{idx + 1}</div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8"><CTAButton>Post your task</CTAButton></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Category title="Furniture assembly" caption="Flatpack assembly and disassembly" />
            <Category title="Deliveries" caption="Urgent deliveries and courier services" />
            <Category title="Gardening & landscaping" caption="Mulching, weeding and tidying up" />
            <Category title="Painting" caption="Interior and exterior wall painting" />
            <Category title="Business & admin" caption="Help with accounting and tax returns" />
            <Category title="Something else" caption="Wall mount art and paintings" />
          </div>
        </div>
      </section>

      {/* What others are getting done */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-extrabold tracking-tight mb-8">See what others are getting done</h3>
          <div className="flex flex-wrap gap-4 text-slate-600 text-sm mb-6">
            {['Moving in','Home maintenance','Starting a business','Parties','Something different'].map((f) => (
              <button key={f} className="px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50">{f}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            <TaskCard title="Sofa delivery" price="$95" tag="DELIVERY" />
            <TaskCard title="End of lease clean" price="$450" tag="CLEANING" />
            <TaskCard title="Couch moved 1km down the road" price="$60" tag="REMOVALS" />
            <TaskCard title="Urgent removalist" price="$450" tag="REMOVALS" />
          </div>
          <div className="mt-8"><CTAButton>Post your task for free</CTAButton></div>
        </div>
      </section>

      {/* Trust & safety */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-indigo-200 to-blue-300" />
            <div className="absolute left-8 bottom-8 flex flex-col gap-2">
              <Pill><CheckCircle className="size-4"/> Job completed <span className="text-slate-500">2m ago</span></Pill>
              <Pill><CreditCard className="size-4"/> Payment released <span className="text-slate-500">2m ago</span></Pill>
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold tracking-tight mb-6">Trust and safety features for your protection</h3>
            <div className="grid gap-6">
              <Card>
                <div className="flex items-start gap-4">
                  <Shield className="size-6 text-[#2F6DF6]"/>
                  <div>
                    <h4 className="font-semibold">Secure payments</h4>
                    <p className="text-slate-600">Only release payment when the task is completed to your satisfaction.</p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-4">
                  <Star className="size-6 text-[#2F6DF6]"/>
                  <div>
                    <h4 className="font-semibold">Trusted ratings and reviews</h4>
                    <p className="text-slate-600">Pick the right person for the task based on real ratings and reviews from other users.</p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-4">
                  <Shield className="size-6 text-[#2F6DF6]"/>
                  <div>
                    <h4 className="font-semibold">Insurance for peace of mind</h4>
                    <p className="text-slate-600">We provide liability insurance for Taskers performing most task activities.</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="mt-8"><CTAButton>Post your task for free</CTAButton></div>
          </div>
        </div>
      </section>

      {/* Be your own boss */}
      <section className="py-20 bg-[#2F6DF6] text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-4xl font-extrabold tracking-tight mb-6">Be your own boss</h3>
            <ul className="space-y-3 text-white/90">
              {[
                "Free access to thousands of job opportunities",
                "No subscription or credit fees",
                "Earn extra income on a flexible schedule",
                "Grow your business and client base",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3"><CheckCircle className="mt-0.5 size-5"/> {item}</li>
              ))}
            </ul>
            <div className="mt-8"><GhostButton>Earn money as a Tasker</GhostButton></div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-white/10" />
            <Badge><Bell className="size-3"/> New job alert!</Badge>
            <Card className="absolute -bottom-6 left-6 right-6">
              <div className="text-sm text-slate-500">Total earnings</div>
              <div className="text-3xl font-extrabold">$13,066</div>
              <div className="text-green-600 text-sm">↑ 20% vs last month</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Taskers earned income */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-extrabold tracking-tight mb-10">160,000 Taskers have earned an income on Airtasker</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[1,2].map((i) => (
              <Card key={i}>
                <div className="md:flex items-start gap-6">
                  <div className="w-full md:w-48 aspect-square rounded-2xl bg-blue-100" />
                  <div className="flex-1 mt-4 md:mt-0">
                    <h4 className="text-2xl font-extrabold tracking-tight mb-2">HASSAN</h4>
                    <div className="flex items-center gap-6 text-sm mb-2">
                      <div className="flex items-center gap-1"><Star className="size-4 fill-yellow-400 text-yellow-400" /> 5 <span className="text-slate-500">Overall rating</span></div>
                      <div>97% <span className="text-slate-500">Completion rate</span></div>
                    </div>
                    <p className="text-slate-600 mb-3">Specialities: 24/7 emergency plumbing, gas fitting, renovations</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Digital iD</Badge>
                      <Badge>Payment Method</Badge>
                      <Badge>Mobile</Badge>
                    </div>
                    <p className="mt-4 text-slate-700 text-sm">“A+++ for Hassan! Highly professional, punctual and he did it all with a friendly smile.”</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-extrabold tracking-tight mb-10">Articles, stories and more</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {["The Feature Hub (Q3 2025)", "Tax season tips for Australians", "Getting more done with our partners"].map((title, i) => (
              <Card key={i}>
                <div className="aspect-[16/9] rounded-xl bg-blue-100 mb-4" />
                <h4 className="font-semibold mb-2">{title}</h4>
                <p className="text-slate-600 text-sm">Read more</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top categories mega list */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div>
              <h3 className="text-4xl font-extrabold tracking-tight mb-2">Top Categories</h3>
              <p className="text-slate-600">See some of our top categories in your area</p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-3 text-slate-700">
              {[
                "Aircon Repair","Artificial Grass Install","At-home Hair Extensions","At-home Personal Trainer","Attic Cleaners","Babysitters","Barista","Bartenders","Basketball Hoop System Assembly","Bicycle Tyre Repair","Bird Sitters","Bookkeepers","Boxing Instructors","Bull Bar Installers","Bunnings Shed Install","Business Planners","Cake Decorators","Car Aircon Regas Specialists","Carpet Laying","Cat Groomers","Catalogue Distribution","Ceiling Cleaners","Children Entertainers","Clothesline Installers","Clown Hire","Coffee Machine Repairs","Computer Repairs","Curtain Rod Installers","Customer Service Staffing"
              ].map((x) => (
                <a key={x} href="#" className="hover:text-slate-900">{x}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Countries */}
      <footer className="bg-[#0D1A4B] text-white/90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-wrap items-center gap-6">
          {["Airtasker Ireland","Airtasker New Zealand","Airtasker Singapore","Airtasker United Kingdom","Airtasker United States"].map((c) => (
            <a key={c} href="#" className="hover:text-white">{c}</a>
          ))}
        </div>
        <div className="bg-[#081033] text-white/60 text-sm py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">© {new Date().getFullYear()} Airtasker* — demo UI for educational purposes.</div>
        </div>
      </footer>
    </main>
  );
}
