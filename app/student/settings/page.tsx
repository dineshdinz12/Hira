import { Badge } from "@/components/ui/badge"
import { StudentSidebar } from "@/components/student/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LucideBell,
  LucideGlobe,
  LucideKey,
  LucideLock,
  LucideMail,
  LucideShield,
  LucideSmartphone,
  LucideUser,
  LucideLinkedin,
  LucideGithub,
} from "lucide-react"

export default function StudentSettings() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <StudentSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
                <p className="text-slate-600 dark:text-slate-400">Manage your account preferences</p>
              </div>
              <div>
                <Button>Save Changes</Button>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="account" orientation="vertical" className="w-full">
                    <TabsList className="flex flex-col items-start h-auto w-full bg-transparent p-0 mb-6">
                      <TabsTrigger
                        value="account"
                        className="w-full justify-start px-3 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 dark:data-[state=active]:bg-purple-900/20 dark:data-[state=active]:text-purple-50"
                      >
                        <LucideUser className="mr-2 h-4 w-4" />
                        Account
                      </TabsTrigger>
                      <TabsTrigger
                        value="profile"
                        className="w-full justify-start px-3 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 dark:data-[state=active]:bg-purple-900/20 dark:data-[state=active]:text-purple-50"
                      >
                        <LucideUser className="mr-2 h-4 w-4" />
                        Profile
                      </TabsTrigger>
                      <TabsTrigger
                        value="notifications"
                        className="w-full justify-start px-3 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 dark:data-[state=active]:bg-purple-900/20 dark:data-[state=active]:text-purple-50"
                      >
                        <LucideBell className="mr-2 h-4 w-4" />
                        Notifications
                      </TabsTrigger>
                      <TabsTrigger
                        value="security"
                        className="w-full justify-start px-3 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 dark:data-[state=active]:bg-purple-900/20 dark:data-[state=active]:text-purple-50"
                      >
                        <LucideShield className="mr-2 h-4 w-4" />
                        Security
                      </TabsTrigger>
                      <TabsTrigger
                        value="privacy"
                        className="w-full justify-start px-3 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 dark:data-[state=active]:bg-purple-900/20 dark:data-[state=active]:text-purple-50"
                      >
                        <LucideLock className="mr-2 h-4 w-4" />
                        Privacy
                      </TabsTrigger>
                      <TabsTrigger
                        value="integrations"
                        className="w-full justify-start px-3 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 dark:data-[state=active]:bg-purple-900/20 dark:data-[state=active]:text-purple-50"
                      >
                        <LucideGlobe className="mr-2 h-4 w-4" />
                        Integrations
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="account">
                <TabsContent value="account" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Update your account details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Alex" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Johnson" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="alex.johnson@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="america_los_angeles">
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="america_los_angeles">Pacific Time (US & Canada)</SelectItem>
                            <SelectItem value="america_denver">Mountain Time (US & Canada)</SelectItem>
                            <SelectItem value="america_chicago">Central Time (US & Canada)</SelectItem>
                            <SelectItem value="america_new_york">Eastern Time (US & Canada)</SelectItem>
                            <SelectItem value="europe_london">London</SelectItem>
                            <SelectItem value="europe_paris">Paris</SelectItem>
                            <SelectItem value="asia_tokyo">Tokyo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="profile" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription>Manage how your profile appears to others</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          defaultValue="Full-Stack Developer with 5+ years of experience in building responsive web applications using React, Node.js, and MongoDB."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="headline">Professional Headline</Label>
                        <Input id="headline" defaultValue="Full-Stack Developer" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="San Francisco, CA" />
                      </div>
                      <div className="space-y-2">
                        <Label>Profile Visibility</Label>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="public-profile">Public Profile</Label>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Allow recruiters to discover your profile
                            </p>
                          </div>
                          <Switch id="public-profile" defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Control how and when you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Email Notifications</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="job-alerts">Job Alerts</Label>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Receive notifications about new job opportunities
                              </p>
                            </div>
                            <Switch id="job-alerts" defaultChecked />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="learning-reminders">Learning Reminders</Label>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Receive reminders about your learning progress
                              </p>
                            </div>
                            <Switch id="learning-reminders" defaultChecked />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="interview-notifications">Interview Notifications</Label>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Receive updates about upcoming interviews
                              </p>
                            </div>
                            <Switch id="interview-notifications" defaultChecked />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Push Notifications</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="push-all">All Push Notifications</Label>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Enable or disable all push notifications
                              </p>
                            </div>
                            <Switch id="push-all" defaultChecked />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">SMS Notifications</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="sms-critical">Critical Updates Only</Label>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Receive SMS only for critical updates
                              </p>
                            </div>
                            <Switch id="sms-critical" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your account security</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button className="mt-2">Update Password</Button>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="enable-2fa">Enable Two-Factor Authentication</Label>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Add an extra layer of security to your account
                              </p>
                            </div>
                            <Switch id="enable-2fa" />
                          </div>
                        </div>
                        <Button variant="outline" className="gap-2">
                          <LucideSmartphone size={16} />
                          <span>Set Up Authenticator App</span>
                        </Button>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-medium">Login Sessions</h3>
                        <div className="space-y-2">
                          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">Current Session</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                  San Francisco, CA • Chrome on macOS
                                </div>
                              </div>
                              <Badge>Active Now</Badge>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full gap-2">
                            <LucideKey size={16} />
                            <span>Log Out of All Other Sessions</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="privacy" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>Control your data and privacy preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Profile Privacy</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="profile-visibility">Profile Visibility</Label>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Control who can view your profile
                              </p>
                            </div>
                            <Select defaultValue="public">
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select visibility" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="recruiters">Recruiters Only</SelectItem>
                                <SelectItem value="connections">Connections Only</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="resume-visibility">Resume Visibility</Label>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Control who can view your resume
                              </p>
                            </div>
                            <Select defaultValue="recruiters">
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select visibility" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="recruiters">Recruiters Only</SelectItem>
                                <SelectItem value="connections">Connections Only</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-medium">Data Usage</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="personalized-recommendations">Personalized Recommendations</Label>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Allow us to use your data to provide personalized recommendations
                              </p>
                            </div>
                            <Switch id="personalized-recommendations" defaultChecked />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="usage-analytics">Usage Analytics</Label>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Allow us to collect anonymous usage data to improve our services
                              </p>
                            </div>
                            <Switch id="usage-analytics" defaultChecked />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-medium">Data Management</h3>
                        <div className="space-y-2">
                          <Button variant="outline" className="gap-2">
                            <LucideMail size={16} />
                            <span>Request Data Export</span>
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Button variant="outline" className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <LucideLock size={16} />
                            <span>Delete Account</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="integrations" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Integrations</CardTitle>
                      <CardDescription>Connect your account with other services</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#0A66C2] text-white p-2 rounded-lg">
                              <LucideLinkedin size={20} />
                            </div>
                            <div>
                              <div className="font-medium">LinkedIn</div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">Connected</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Disconnect
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#24292e] text-white p-2 rounded-lg">
                              <LucideGithub size={20} />
                            </div>
                            <div>
                              <div className="font-medium">GitHub</div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">Connected</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Disconnect
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-lg">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-slate-600 dark:text-slate-400"
                              >
                                <path
                                  d="M16.5 16.5L21 21"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M19 11.5C19 15.6421 15.6421 19 11.5 19C7.35786 19 4 15.6421 4 11.5C4 7.35786 7.35786 4 11.5 4C15.6421 4 19 7.35786 19 11.5Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M11.5 7V16"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7 11.5H16"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium">Stack Overflow</div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">Not connected</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Connect
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-lg">
                              <LucideGlobe size={20} className="text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                              <div className="font-medium">Personal Website</div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">Not connected</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Connect
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
