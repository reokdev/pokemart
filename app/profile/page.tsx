import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { sql } from "@/lib/db"

async function getGradingSubmissions(userId: string) {
  try {
    const submissions = await sql`
      SELECT * FROM grading_submissions 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `
    return submissions
  } catch (error) {
    console.error("Failed to fetch grading submissions:", error)
    return []
  }
}

async function getOrders(userId: string) {
  try {
    const orders = await sql`
      SELECT * FROM orders 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `
    return orders
  } catch (error) {
    console.error("Failed to fetch orders:", error)
    return []
  }
}

export default async function ProfilePage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    redirect("/sign-in")
  }

  const gradingSubmissions = await getGradingSubmissions(userId)
  const orders = await getOrders(userId)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid md:grid-cols-4 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>
              {user.firstName} {user.lastName}
            </CardTitle>
            <CardDescription>{user.emailAddresses[0].emailAddress}</CardDescription>
          </CardHeader>
          <CardContent>
            <nav className="flex flex-col space-y-1">
              <Link href="/profile" className="px-3 py-2 rounded-md bg-gray-100 font-medium text-gray-900">
                Dashboard
              </Link>
              <Link href="/profile/edit" className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                Edit Profile
              </Link>
              <Link href="/profile/addresses" className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                Addresses
              </Link>
              <Link href="/profile/payment-methods" className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                Payment Methods
              </Link>
            </nav>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="orders">
            <TabsList className="mb-6">
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="grading">Grading Submissions</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and manage your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <div>
                              <p className="font-medium">Order #{order.id}</p>
                              <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${order.total_amount.toFixed(2)}</p>
                              <p className="text-sm text-gray-500">
                                Status: <span className="text-green-600">{order.status}</span>
                              </p>
                            </div>
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/profile/orders/${order.id}`}>View Details</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                      <Button asChild>
                        <Link href="/shop">Browse Shop</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grading">
              <Card>
                <CardHeader>
                  <CardTitle>Grading Submissions</CardTitle>
                  <CardDescription>Track the status of your card grading submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  {gradingSubmissions.length > 0 ? (
                    <div className="space-y-4">
                      {gradingSubmissions.map((submission) => (
                        <div key={submission.id} className="border rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <div>
                              <p className="font-medium">Submission #{submission.id}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(submission.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{submission.card_name}</p>
                              <p className="text-sm text-gray-500">
                                Status: <span className="text-blue-600">{submission.status}</span>
                              </p>
                            </div>
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/profile/grading/${submission.id}`}>View Details</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You haven't submitted any cards for grading yet.</p>
                      <Button asChild>
                        <Link href="/grading/submit">Submit Cards for Grading</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

