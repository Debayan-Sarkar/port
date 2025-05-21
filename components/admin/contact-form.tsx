"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const contactSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Please enter your address" }),
  mapEmbedUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  contactFormEnabled: z.boolean(),
  formSuccessMessage: z.string().min(5, { message: "Please enter a success message" }),
  whatsappNumber: z.string().min(5, { message: "Please enter a valid WhatsApp number" }).optional().or(z.literal("")),
  whatsappEnabled: z.boolean(),
  socialLinks: z.object({
    linkedin: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    twitter: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    github: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    instagram: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    facebook: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  }),
})

type ContactSettings = z.infer<typeof contactSchema>

// Mock data - in a real app, this would come from your database
const initialContactSettings: ContactSettings = {
  email: "contact@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Developer Way, Tech City, CA 94043",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0974757206384!2d-122.08427492392836!3d37.42199997210171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c66619367e0!2sGoogleplex!5e0!3m2!1sen!2sus!4v1689864340180!5m2!1sen!2sus",
  contactFormEnabled: true,
  formSuccessMessage: "Thank you for your message! I'll get back to you as soon as possible.",
  whatsappNumber: "+15551234567",
  whatsappEnabled: true,
  socialLinks: {
    linkedin: "https://linkedin.com/in/example",
    twitter: "https://twitter.com/example",
    github: "https://github.com/example",
    instagram: "https://instagram.com/example",
    facebook: "",
  },
}

export function ContactForm() {
  const { toast } = useToast()
  const [contactSettings, setContactSettings] = useState<ContactSettings>(initialContactSettings)

  const form = useForm<ContactSettings>({
    resolver: zodResolver(contactSchema),
    defaultValues: initialContactSettings,
  })

  const onSubmit = (data: ContactSettings) => {
    setContactSettings(data)
    toast({
      title: "Settings updated",
      description: "Your contact settings have been updated successfully.",
    })
  }

  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList>
        <TabsTrigger value="general">General Contact</TabsTrigger>
        <TabsTrigger value="form">Contact Form</TabsTrigger>
        <TabsTrigger value="social">Social Media</TabsTrigger>
      </TabsList>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TabsContent value="general">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your business address" className="min-h-[80px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mapEmbedUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Maps Embed URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.google.com/maps/embed?..." {...field} />
                      </FormControl>
                      <FormDescription>The embed URL from Google Maps to show your location</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {contactSettings.mapEmbedUrl && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Map Preview:</p>
                    <div className="w-full h-[300px] border rounded-md overflow-hidden">
                      <iframe
                        src={contactSettings.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="form">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="contactFormEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div>
                        <FormLabel>Enable Contact Form</FormLabel>
                        <FormDescription>Allow visitors to contact you through the form</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="formSuccessMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Success Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Thank you for your message!" className="min-h-[80px]" {...field} />
                      </FormControl>
                      <FormDescription>Message shown after successful form submission</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsappEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div>
                        <FormLabel>Enable WhatsApp Button</FormLabel>
                        <FormDescription>Show a WhatsApp contact button on your site</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+15551234567" {...field} disabled={!form.watch("whatsappEnabled")} />
                      </FormControl>
                      <FormDescription>Include country code without spaces or special characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="socialLinks.linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://linkedin.com/in/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialLinks.twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://twitter.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialLinks.github"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialLinks.instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://instagram.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialLinks.facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://facebook.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end mt-6">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </Tabs>
  )
}
