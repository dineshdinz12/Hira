import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ResumePreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
        <CardDescription>Modern template</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400">Alex Johnson</h2>
              <p className="text-slate-600 dark:text-slate-400">Full-Stack Developer</p>
              <div className="flex flex-wrap gap-2 mt-2 text-xs text-slate-500 dark:text-slate-500">
                <span>alex.johnson@example.com</span>
                <span>•</span>
                <span>(555) 123-4567</span>
                <span>•</span>
                <span>San Francisco, CA</span>
                <span>•</span>
                <span>linkedin.com/in/alexjohnson</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase">
                Professional Summary
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Experienced Full-Stack Developer with 5+ years of expertise in building responsive web applications
                using React, Node.js, and MongoDB. Passionate about creating clean, efficient code and delivering
                exceptional user experiences. Strong problem-solving skills and experience working in agile
                environments.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase">Work Experience</h3>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <div className="font-medium text-xs">Senior Frontend Developer</div>
                  <div className="text-xs text-slate-500 dark:text-slate-500">Jan 2023 - Present</div>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500">TechCorp Inc.</div>
                <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-0.5 mt-1">
                  <li>Led the development of a React-based dashboard that improved user engagement by 40%</li>
                  <li>Implemented performance optimizations that reduced load time by 60%</li>
                  <li>Mentored junior developers and conducted code reviews</li>
                  <li>Collaborated with UX designers to implement responsive designs</li>
                </ul>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <div className="font-medium text-xs">Full-Stack Developer</div>
                  <div className="text-xs text-slate-500 dark:text-slate-500">Mar 2020 - Dec 2022</div>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500">WebSolutions LLC</div>
                <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-0.5 mt-1">
                  <li>Developed and maintained multiple client websites using React and Node.js</li>
                  <li>Created RESTful APIs and integrated with third-party services</li>
                  <li>Implemented authentication and authorization systems</li>
                  <li>Optimized database queries and improved application performance</li>
                </ul>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase">Education</h3>
              <div className="space-y-0.5">
                <div className="flex justify-between">
                  <div className="font-medium text-xs">Bachelor of Science in Computer Science</div>
                  <div className="text-xs text-slate-500 dark:text-slate-500">2016 - 2020</div>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500">University of Technology</div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                  React
                </span>
                <span className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                  Node.js
                </span>
                <span className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                  JavaScript
                </span>
                <span className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                  TypeScript
                </span>
                <span className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                  MongoDB
                </span>
                <span className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                  Express
                </span>
                <span className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                  HTML/CSS
                </span>
                <span className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                  Git
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase">Projects</h3>
              <div className="space-y-2">
                <div>
                  <div className="font-medium text-xs">E-commerce Platform</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Built a full-stack e-commerce platform using React, Node.js, and MongoDB with features like user
                    authentication, product catalog, and payment processing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
