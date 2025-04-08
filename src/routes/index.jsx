import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Container } from "@mui/material";
import Footer from "../components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Container maxWidth="lg">
        <main className="w-full">
          <section className="grid md:grid-cols-2 gap-8 items-center w-full min-h-120">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Calcule sua margem de lucro com facilidade
              </h1>
              <p className="text-gray-600 mb-6 text-lg">
                Organize seus produtos, veja quanto você realmente lucra e tome
                decisões melhores para seu e-commerce.
              </p>
              <Button
                variant="contained"
                disableElevation
                component={Link}
                to="/produtos"
              >
                Comece Gratuitamente
              </Button>
            </div>
            <img
              src="/home.webp"
              alt="Ilustração de lucro"
              className="w-full max-w-md mx-auto"
            />
          </section>

          <section className="bg-gray-100 py-16 rounded-lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Como funciona</h2>
              <p className="text-gray-600 mt-2">
                Seu controle de produtos em 3 passos simples
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
              {[
                {
                  title: "1. Cadastre-se",
                  desc: "Crie uma conta gratuita para começar.",
                },
                {
                  title: "2. Adicione produtos",
                  desc: "Informe seus custos, preço de venda e veja a margem automaticamente.",
                },
                {
                  title: "3. Organize",
                  desc: "Tenha uma visão clara de todos os seus produtos ativos e planejados.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center"
                >
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </Container>
      <Footer />
    </>
  );
}
